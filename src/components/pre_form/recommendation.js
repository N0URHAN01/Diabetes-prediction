import axios from 'axios';

export const recommendationHandler = async (token) => {
  try {
    const recommendationApiUrl = 'http://127.0.0.1:3001/users/recommend'; // Update with your backend recommendation API URL
    const headers = {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json' // Add Content-Type header
    };

    const response = await axios.post(recommendationApiUrl, {}, { headers, responseType: 'blob' });

    let fileName = 'recommendations.csv';
    const contentDisposition = response.headers['content-disposition'];
    if (contentDisposition) {
      fileName = contentDisposition.split('filename=')[1];
    }

    // Create a URL object from the blob response
    const url = window.URL.createObjectURL(new Blob([response.data]));
    
    // Create a link element to trigger the download
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', fileName);
    document.body.appendChild(link);
    
    // Trigger the click event on the link to start the download
    link.click();
    
    // Cleanup: remove the link element and revoke the URL object
    link.parentNode.removeChild(link);
    window.URL.revokeObjectURL(url);

    console.log('Recommendation download initiated');
  } catch (error) {
    console.error('Error in recommendationHandler:', error);
    // Handle error
  }
};
