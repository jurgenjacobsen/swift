declare const qrcode: (
	typeNumber: number,
	errorCorrectionLevel: 'L' | 'M' | 'Q' | 'H'
) => {
	addData(data: string): void;
	make(): void;
	renderTo2dContext(context: CanvasRenderingContext2D, cellSize?: number): void;
	getModuleCount(): number;
};

const qrCanvas = document.getElementById('qrCanvas') as HTMLCanvasElement | null;
const qrInput = document.getElementById('qrInput') as HTMLInputElement | null;
const statusElement = document.getElementById('status') as HTMLParagraphElement | null;
const useTabButton = document.getElementById('useTabBtn') as HTMLButtonElement | null;
const downloadButton = document.getElementById('downloadBtn') as HTMLButtonElement | null;

async function getCurrentTabUrl(): Promise<string> {
	const tabs = await chrome.tabs.query({ active: true, lastFocusedWindow: true });
	const [activeTab] = tabs;
	return activeTab?.url ?? activeTab?.pendingUrl ?? '';
}

async function renderQRCode(value: string): Promise<void> {
	if (!qrCanvas || !statusElement) {
		return;
	}

	const content = value.trim();
	if (!content) {
		const context = qrCanvas.getContext('2d');
		if (context) {
			context.clearRect(0, 0, qrCanvas.width, qrCanvas.height);
		}
		statusElement.textContent = 'Enter text to generate a QR code.';
		return;
	}

	try {
		const context = qrCanvas.getContext('2d');
		if (!context) {
			statusElement.textContent = 'Canvas is not available.';
			return;
		}

		const qr = qrcode(0, 'M');
		qr.addData(content);
		qr.make();

		const moduleCount = qr.getModuleCount();
		const canvasSize = qrCanvas.width;
		const padding = 8;
		const cellSize = Math.max(1, Math.floor((canvasSize - padding * 2) / moduleCount));
		const qrPixelSize = cellSize * moduleCount;
		const offset = Math.floor((canvasSize - qrPixelSize) / 2);

		context.clearRect(0, 0, canvasSize, canvasSize);
		context.fillStyle = '#ffffff';
		context.fillRect(0, 0, canvasSize, canvasSize);
		context.save();
		context.translate(offset, offset);
		qr.renderTo2dContext(context, cellSize);
		context.restore();

		statusElement.textContent = 'QR code ready.';
	} catch {
		statusElement.textContent = 'Could not generate QR code.';
	}
}

function downloadCurrentQr(): void {
	if (!qrCanvas || !statusElement) {
		return;
	}

	const dataUrl = qrCanvas.toDataURL('image/png');
	const anchor = document.createElement('a');
	anchor.href = dataUrl;
	anchor.download = 'swift-qr.png';
	anchor.click();
	statusElement.textContent = 'Downloaded as PNG.';
}

async function initializePopup(): Promise<void> {
	if (!qrInput || !statusElement) {
		return;
	}

	try {
		const tabUrl = await getCurrentTabUrl();
		if (!tabUrl) {
			statusElement.textContent = 'No URL available for this tab.';
			return;
		}
		qrInput.value = tabUrl;
		await renderQRCode(tabUrl);
	} catch {
		statusElement.textContent = 'Unable to read current tab URL.';
	}

	qrInput.addEventListener('input', () => {
		void renderQRCode(qrInput.value);
	});

	useTabButton?.addEventListener('click', async () => {
		const tabUrl = await getCurrentTabUrl();
		if (!tabUrl) {
			statusElement.textContent = 'No URL available for this tab.';
			return;
		}
		qrInput.value = tabUrl;
		await renderQRCode(tabUrl);
	});

	downloadButton?.addEventListener('click', () => {
		downloadCurrentQr();
	});
}

void initializePopup();
