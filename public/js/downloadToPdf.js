document.getElementById('downloadPdfBtn').addEventListener('click', function() {

    const detailsElements = document.querySelectorAll('details.work-location')
    const hideOnDownload = document.querySelectorAll('hide-on-download')

    hideOnDownload.forEach(element =>{
        element.hidden = true
    })

    detailsElements.forEach(details => {
        details.open = true;
      });

      
    const element = document.getElementById('pdfContent');
    const options = {
      margin: 1,
      filename: `<%= project.projectName %>_report.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };
    
    html2pdf().from(element).set(options).save();
  });