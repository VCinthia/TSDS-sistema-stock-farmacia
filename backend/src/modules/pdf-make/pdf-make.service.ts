import { Injectable } from '@nestjs/common';
import * as pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts'; 
import { PdfContent, PdfDocumentDefinition, PdfFonts, PdfGenerateResult, PdfStyleDefinition, PdfTableRow} from './interfaces/pdf.interface';
import { DetalleVentaDTO, ResponseVentaDto } from '../venta/dto/response-venta.dto';
import { formatCurrency, formatDateTime, formatPercentage } from 'common/helpers/formatter-helper';

@Injectable()
export class PdfMakeService {
  private readonly fonts: PdfFonts;
  private readonly numeroColumnas: number = 4;


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
    },
    subheader: {
      fontSize: 10,
      bold: true,
      color: '#444444',
      margin: [0, 0, 0, 15],
    },
    tableHeader: {
      bold: true,
      fontSize: 9,
      color: '#44474E',
      fillColor: '#D0D2DB',
      alignment: 'center',
    },
    tableCell: {
      fontSize: 9,
      padding: [0, 3, 0, 3],
    },
    ventaHeader: {
      bold: true,
      fontSize: 10,
      color: '#fff',
      fillColor: '#6B8099',
      margin: [0, 5, 0, 2],
    },
    noDetails: {
      fontSize: 9,
      italic: true,
      color: '#999999',
      alignment: 'center',
    },
    separator: {
      fontSize: 4,
      margin: [0, 5, 0, 10]
    },
    summaryLabel: {
      bold: true,
      fontSize: 9,
    },
    summaryValue: {
      bold: false,
      fontSize: 9,
    },
    ventaSummary: {
      margin: [0, 10, 0, 5],
      lineHeight: 1.3,
      background: '#ffffff',
      padding: [5, 10, 5, 10]
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
      widths: ['*', 'auto', 'auto', 'auto'],
      body: tableBody,
    }
  };
}

// Nuevos métodos auxiliares
private createVentaHeaderRow(venta: ResponseVentaDto): PdfTableRow[] {
  const fechaVenta = new Date(venta.fecha);
  const fechaFormatted = formatDateTime(fechaVenta);

  return [
    {
      text: `VENTA #${venta.id_venta} - ${fechaFormatted} `,
      style: 'ventaHeader',
      colSpan: this.numeroColumnas,
      alignment: 'left'
    },
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
  ];
}



private createNoDetailsRow(): PdfTableRow[] {
  return [
    {
      text: 'SIN DETALLES DE PRODUCTOS',
      style: 'noDetails',
      colSpan: this.numeroColumnas,
      alignment: 'center'
    },
    this.createOneEmptyCell(),
    this.createOneEmptyCell(),
    this.createOneEmptyCell()// Celdas vacías para completar el colspan
  ];
}

private createVentaSummaryRow(venta: ResponseVentaDto): PdfTableRow[] {
  // Texto enriquecido con diferentes estilos
  const richText = [
    { text: 'Cliente: ', style: 'summaryLabel' },
    { text: `${venta.cliente?.nombre || 'N/A'}`, style: 'summaryValue' },
    { text: '   |   Receta: ', style: 'summaryLabel' },
    { text: `${venta.ticketReceta?.numero_receta || 'N/A'}`, style: 'summaryValue' },
    { text: '   |   Descuento: ', style: 'summaryLabel' },
    { text: `${formatPercentage(venta.descuento_porcentaje)}`, style: 'summaryValue' },
    { text: '   |   Precio final: ', style: 'summaryLabel' },
    { text: formatCurrency(venta.total_final), style: 'summaryValue' }
  ];
  return [
    {
      text: richText,
      style: 'ventaSummary',
      colSpan: this.numeroColumnas,
      alignment: 'right'
    },
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
      colSpan: this.numeroColumnas,
    },
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
    }
  ];
}


}
