import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export const generateTripPDF = (trip) => {
   const doc = new jsPDF();

   // Company Header
   doc.setFontSize(22);
   doc.setTextColor(41, 128, 185); // Blue color
   doc.text('CamionTrack', 14, 20);

   doc.setFontSize(10);
   doc.setTextColor(100);
   doc.text('Ordre de Mission', 14, 28);
   doc.line(14, 32, 196, 32); // Horizontal line

   // Trip Details Title
   doc.setFontSize(16);
   doc.setTextColor(0);
   doc.text(`Trajet #${trip.id.slice(-6)}`, 14, 45);

   // Status Badge (Text representation)
   doc.setFontSize(10);
   doc.setTextColor(100);
   const statusMap = {
      planned: 'Planifié',
      in_progress: 'En cours',
      completed: 'Terminé',
      cancelled: 'Annulé'
   };
   doc.text(`Statut: ${statusMap[trip.status] || trip.status}`, 150, 45);

   // Main Info Section
   autoTable(doc, {
      startY: 55,
      head: [['Détails du Trajet', '']],
      body: [
         ['Origine', trip.origin],
         ['Destination', trip.destination],
         ['Date de début prévue', new Date(trip.plannedStart).toLocaleString()],
         ['Date de fin prévue', new Date(trip.plannedEnd).toLocaleString()],
      ],
      theme: 'striped',
      headStyles: { fillColor: [41, 128, 185] },
      styles: { fontSize: 10, cellPadding: 5 }
   });

   // Vehicle & Driver Info
   autoTable(doc, {
      startY: doc.lastAutoTable.finalY + 10,
      head: [['Véhicule', 'Chauffeur']],
      body: [
         [
            `${trip.vehicle?.plateNumber || 'N/A'}\n${trip.vehicle?.model || ''}`,
            `${trip.driver?.firstName || ''} ${trip.driver?.lastName || ''}\n${trip.driver?.email || ''}`
         ]
      ],
      theme: 'grid',
      headStyles: { fillColor: [52, 73, 94] },
      styles: { fontSize: 10, cellPadding: 5 }
   });

   // Footer
   const pageCount = doc.internal.getNumberOfPages();
   for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(8);
      doc.setTextColor(150);
      doc.text(
         `Généré le ${new Date().toLocaleString()} - Page ${i} sur ${pageCount}`,
         doc.internal.pageSize.width / 2,
         doc.internal.pageSize.height - 10,
         { align: 'center' }
      );
   }

   // Save the PDF
   doc.save(`ordre-mission-${trip.id.slice(-6)}.pdf`);
};
