export type BmpHeader = {
    imageWidth: number;
    imageHeight: number;
    planes: number;
    bitsPerPixel: number;
    compression: number;
    imageSize: number;
    xPixelsPerMeter: number;
    yPixelsPerMeter: number;
};

export class BmpParser {
    public static parseHeader(buffer: ArrayBuffer): BmpHeader {
        const view = new DataView(buffer);
        let offset = 0;

        if (view.getUint16(offset) !== 0x424D) {
            throw new Error("Invalid BMP file");
        }
        offset += 2;

        const fileSize = view.getUint32(offset, true);
        offset += 4;

        offset += 4; // skip reserved bytes

        const dataOffset = view.getUint32(offset, true);
        offset += 4;

        const headerSize = view.getUint32(offset, true);
        offset += 4;

        const imageWidth = view.getInt32(offset, true);
        offset += 4;

        const imageHeight = view.getInt32(offset, true);
        offset += 4;

        const planes = view.getUint16(offset, true);
        offset += 2;

        const bitsPerPixel = view.getUint16(offset, true);
        offset += 2;

        const compression = view.getUint32(offset, true);
        offset += 4;

        const imageSize = view.getUint32(offset, true);
        offset += 4;

        const xPixelsPerMeter = view.getInt32(offset, true);
        offset += 4;

        const yPixelsPerMeter = view.getInt32(offset, true);
        offset += 4;

        return {
            imageWidth,
            imageHeight,
            planes,
            bitsPerPixel,
            compression,
            imageSize,
            xPixelsPerMeter,
            yPixelsPerMeter,
        };
    }
}
