const API_URL = import.meta.env.VITE_API_URL;

export const handleDownload = (image: string, fileName?: string) => {
    const url = `${API_URL}/${image}`;
    fetch(url)
        .then((response) => response.blob())
        .then((blob) => {
            const url = window.URL.createObjectURL(new Blob([blob]));
            const link = document.createElement("a");
            link.href = url;
            link.download = fileName || "downloaded-file";
            document.body.appendChild(link);

            link.click();

            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
        })
        .catch((error) => {
            console.error("Error fetching the file:", error);
        });
};

export const handlePdfDownload = (filePath: string, fileName?: string) => {
  // Construct the full URL of the PDF file.
  const url = `${API_URL}/${filePath}`;

  // Fetch the file from the server.
  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.blob();
    })
    .then((blob) => {
      // Create a URL for the blob and prepare for download.
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = downloadUrl;
      // Use the provided filename or default to "downloaded-file.pdf".
      link.download = fileName || 'downloaded-file.pdf';
      document.body.appendChild(link);
      link.click();

      // Clean up by removing the link and revoking the object URL.
      document.body.removeChild(link);
      window.URL.revokeObjectURL(downloadUrl);
    })
    .catch((error) => {
      console.error('Error fetching the PDF file:', error);
    });
};

