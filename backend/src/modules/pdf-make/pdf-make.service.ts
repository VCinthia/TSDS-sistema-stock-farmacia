import { Injectable } from '@nestjs/common';
import * as pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts'; 
import { PdfContent, PdfDocumentDefinition, PdfFonts, PdfGenerateResult, PdfStyleDefinition, PdfTableRow } from './interfaces/pdf.interface';
import { DetalleVentaDTO, ResponseVentaDto } from '../venta/dto/response-venta.dto';
import { formatCurrency, formatDateTime } from 'common/helpers/formatter-helper';

@Injectable()
export class PdfMakeService {
  private readonly fonts: PdfFonts;


  constructor() {
    // Configuración de fuentes
    this.fonts = {
      Roboto: {
        normal: 'Roboto-Regular.ttf',
        bold: 'Roboto-Medium.ttf',
        italics: 'Roboto-Italic.ttf',
        bolditalics: 'Roboto-MediumItalic.ttf'
      },
      // Alias para Helvetica usando Roboto
      Helvetica: {
        normal: 'Roboto-Regular.ttf',
        bold: 'Roboto-Medium.ttf',
        italics: 'Roboto-Italic.ttf',
        bolditalics: 'Roboto-MediumItalic.ttf'
      }
    };

    // Inicializar las fuentes CORRECTAMENTE
    (pdfMake as any).vfs = pdfFonts.pdfMake ? 
      pdfFonts.pdfMake.vfs : 
      pdfFonts.vfs;
  }





  async generateReporteVentasPdf(ventas: ResponseVentaDto[]): Promise<PdfGenerateResult> {
    const documentDefinition = this.getDocumentDefinition(ventas);
    
    const buffer = await new Promise<Buffer>((resolve) => {
      const pdfDoc = pdfMake.createPdf(documentDefinition);
      pdfDoc.getBuffer(resolve);
    });

    return {
      buffer,
      fileName: `reporte_ventas_${new Date().toISOString().slice(0, 10)}.pdf`
    };
  }



  private getDocumentDefinition(ventas: ResponseVentaDto[]): PdfDocumentDefinition {

    const formattedDate = formatDateTime(new Date());

    const content: PdfContent[] = [
      { text: 'Reporte de Ventas', style: 'header' },
       { text: `Fecha: ${formattedDate}`, style: 'subheader' },
      this.createSpacer(),
      this.createTableContent(ventas),
      this.createSpacer(2),
      {
        text: `Total de registros: ${ventas.length}`,
        style: 'footer'
      }
    ];

    const styles: Record<string, PdfStyleDefinition> = {
    header: {
      fontSize: 18,
      bold: true,
      alignment: 'center',
      margin: [0, 0, 0, 10],
      font: 'Roboto'
    },
    subheader: {
      fontSize: 12,
      bold: true,
      color: '#444444',
      margin: [0, 0, 0, 15],
      font: 'Roboto'
    },
    tableHeader: {
      bold: true,
      fontSize: 10,
      color: 'black',
      fillColor: '#f2f2f2',
      alignment: 'center',
      font: 'Roboto'
    },
    tableCell: {
      fontSize: 9,
      padding: [0, 3, 0, 3],
      font: 'Roboto'
    },
    ventaHeader: {
      bold: true,
      fontSize: 11,
      fillColor: '#E9F1FA',
      margin: [0, 5, 0, 2],
      font: 'Roboto'
    },
    ventaSummary: {
      fontSize: 9,
      bold: true,
      margin: [0, 3, 0, 5],
      font: 'Roboto'
    },
    noDetails: {
      fontSize: 9,
      italic: true,
      color: '#999999',
      alignment: 'center',
      font: 'Roboto'
    },
    separator: {
      fontSize: 4,
      margin: [0, 5, 0, 10]
    }
  };

  return {
    content,
    styles,
    defaultStyle: {
      font: 'Roboto'
    },
    fonts: this.fonts
  };
}

 

private createOneEmptyCell(): PdfTableRow {
  return { text: '', style: 'tableCell' };
}


private createHeaderCell(text: string): PdfTableRow {
    return {
      text,
      style: 'tableHeader',
      alignment: 'center'
    };
  }

  private createDataRow2(venta: ResponseVentaDto, detalle: DetalleVentaDTO): PdfTableRow[] {
  // Calcular precio total
  const precioTotal = detalle.cantidad * detalle.precio_unitario;

  return [
    this.createDateCell(venta.fecha),
    { 
      text: detalle.producto?.nombre || 'Producto desconocido', 
      style: 'tableCell' 
    },
    { 
      text: detalle.cantidad.toString(), 
      style: 'tableCell',
      alignment: 'right'
    },
    { 
      text: formatCurrency(detalle.precio_unitario), 
      style: 'tableCell',
      alignment: 'right'
    },
    { 
      text: formatCurrency(precioTotal), 
      style: 'tableCell',
      alignment: 'right'
    },
    { 
      text: venta.ticketReceta?.numero_receta || 'N/A', 
      style: 'tableCell',
      alignment: 'center'
    }
  ];
}

private createDateCell(date: Date): PdfTableRow {
  const fechaVenta = new Date(date);
  const fechaFormatted = fechaVenta.toLocaleDateString('es-AR');
  const horaFormatted = fechaVenta.toLocaleTimeString('es-AR', {
    hour: '2-digit',
    minute: '2-digit'
  });
  
  return {
    text: `${fechaFormatted}\n${horaFormatted}`, 
    style: 'tableCell'
  };
}




  private createSpacer(lines = 1): PdfContent {
  return { text: '\n'.repeat(lines) };
  }



  private createTableContent(ventas: ResponseVentaDto[]): PdfContent {
  // 1. Verificar si hay ventas
  if (!ventas || ventas.length === 0) {
    return { text: 'No hay datos de ventas disponibles', style: 'subheader' };
  }

  // 2. Crear cuerpo de la tabla
  const tableBody: PdfTableRow[][] = [];

  // 3. Iterar ventas
  for (const venta of ventas) {
    // Encabezado de venta
    tableBody.push(this.createVentaHeaderRow(venta));
    
    // Subencabezados para los detalles
    tableBody.push(this.createDetailHeadersRow());


    // Verificar si hay detalles
    if (!venta.detalles || venta.detalles.length === 0) {
      tableBody.push(this.createNoDetailsRow());
    } else {
      // Agregar cada detalle como fila
      for (const detalle of venta.detalles) {
        tableBody.push(this.createDataRow(venta, detalle));
      }
    }

    // Resumen de la venta
    tableBody.push(this.createVentaSummaryRow(venta));
    
    // Separador entre ventas (solo si no es la última)
    if (ventas.indexOf(venta) < ventas.length - 1) {
      tableBody.push(this.createSeparatorRow());
    }
  }

  // 4. Retornar la tabla
  return {
    table: {
      widths: ['*', 'auto', 'auto', 'auto', 'auto'],
      body: tableBody
    }
  };
}

// Nuevos métodos auxiliares
private createVentaHeaderRow(venta: ResponseVentaDto): PdfTableRow[] {
  const fechaVenta = new Date(venta.fecha);
  const fechaFormatted = formatDateTime(fechaVenta);

  return [
    {
      text: `VENTA # - ${fechaFormatted} `,
      style: 'ventaHeader',
      colSpan: 5,
      alignment: 'left'
    },
    this.createOneEmptyCell(),
    this.createOneEmptyCell(),
    this.createOneEmptyCell(),
    this.createOneEmptyCell()
  ];
}



private createDetailHeadersRow(): PdfTableRow[] {
  return [
    this.createHeaderCell('Producto'),
    this.createHeaderCell('Unidades'),
    this.createHeaderCell('Precio Unitario'),
    this.createHeaderCell('Precio Total'),
    this.createHeaderCell('Receta')
  ];
}



private createNoDetailsRow(): PdfTableRow[] {
  return [
    {
      text: 'SIN DETALLES DE PRODUCTOS',
      style: 'noDetails',
      colSpan: 5,
      alignment: 'center'
    },
    this.createOneEmptyCell(),
    this.createOneEmptyCell(),
    this.createOneEmptyCell(),
    this.createOneEmptyCell()// Celdas vacías para completar el colspan
  ];
}

private createVentaSummaryRow(venta: ResponseVentaDto): PdfTableRow[] {
  const puntosInfo = venta.puntos_generados > 0 ? 
    `Puntos generados: ${venta.puntos_generados}` : 
    'Sin puntos generados';

  return [
    {
      text: `Cliente: ${venta.cliente?.nombre || 'N/A'} | Total: ${formatCurrency(venta.total_final)} | ${puntosInfo}`,
      style: 'ventaSummary',
      colSpan: 5,
      alignment: 'right'
    },
    this.createOneEmptyCell(),
    this.createOneEmptyCell(),
    this.createOneEmptyCell(),
    this.createOneEmptyCell()// Celdas vacías para completar el colspan
  ];
}

private createSeparatorRow(): PdfTableRow[] {
  return [
    {
      text: '',
      style: 'separator',
      colSpan: 5,
      border: [false, false, false, true]
    },
    this.createOneEmptyCell(),
    this.createOneEmptyCell(),
    this.createOneEmptyCell(),
    this.createOneEmptyCell()// Celdas vacías para completar el colspan
  ];
}

private createDataRow(venta: ResponseVentaDto, detalle: DetalleVentaDTO): PdfTableRow[] {
  const precioTotal = detalle.cantidad * detalle.precio_unitario;

  return [
    { 
      text: detalle.producto?.nombre || 'Producto desconocido', 
      style: 'tableCell' 
    },
    { 
      text: detalle.cantidad.toString(), 
      style: 'tableCell',
      alignment: 'right'
    },
    { 
      text: formatCurrency(detalle.precio_unitario), 
      style: 'tableCell',
      alignment: 'right'
    },
    { 
      text: formatCurrency(precioTotal), 
      style: 'tableCell',
      alignment: 'right'
    },
    { 
      text: venta.ticketReceta?.numero_receta || 'N/A', 
      style: 'tableCell',
      alignment: 'center'
    }
  ];
}

}
