importScripts("https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js");

self.onmessage = function (e) {
    const { file } = e.data;
    const reader = new FileReader();

    reader.onload = function (event) {
        const data = new Uint8Array(event.target.result);
        const workbook = XLSX.read(data, { type: "array" });
        const sheet = workbook.Sheets[workbook.SheetNames[0]];
        const jsonData = XLSX.utils.sheet_to_json(sheet, { raw: true });

        self.postMessage({ status: "done", jsonData });
    };

    reader.readAsArrayBuffer(file);
};
