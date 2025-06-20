export type PdfAlignment = 'left' | 'center' | 'right' | 'justify';
export type PdfContent = 
  | { text: string; style?: string; alignment?: PdfAlignment }
  | PdfContentTable
  | { image: string; width?: number; alignment?: PdfAlignment }
  | { text: string; margin?: number[] }
  | { text: string; style: string } // Para elementos como saltos de línea
  | null; // Para elementos condicionales




/**
 * Representa una fila en una tabla PDF
 * 
 * @property text - Contenido textual de la celda
 * @property style - Estilo aplicado (debe existir en la definición del documento)
 * @property alignment - Alineación del contenido
 */
export interface PdfTableRow {
  text: string;
  style?: string;
  alignment?: PdfAlignment;
  colSpan?: number;
  rowSpan?: number;
  fillColor?: string;
  border?: [boolean, boolean, boolean, boolean];
}

export interface PdfContentTable {
  table: {
    headerRows?: number;
    widths: (string | number | '*')[];
    body: PdfTableRow[][];
  };
}


// Interfaz completa para estilos
export interface PdfStyleDefinition {
  fontSize?: number;
  bold?: boolean;
  italic?: boolean;
  color?: string;
  fillColor?: string;
  alignment?: PdfAlignment;
  margin?: number | [number, number, number, number];
  padding?: number | [number, number, number, number];
  font?: string;
  decoration?: 'underline' | 'lineThrough' | 'overline';
  background?: string;
  lineHeight?: number;
  characterSpacing?: number;
  // Otras propiedades comunes
  [key: string]: any; // Permite propiedades adicionales
}


export interface PdfDocumentDefinition {
  content: PdfContent[];
  styles?: Record<string, PdfStyleDefinition>;
  defaultStyle?: PdfStyleDefinition;
  images?: Record<string, string>;
  pageMargins?: [number, number, number, number];
  pageSize?: 'A4' | 'LETTER' | string;
  pageOrientation?: 'portrait' | 'landscape';
  // Otras propiedades globales
}

export interface PdfTextElement {
  text: string;
  style?: string;
  alignment?: PdfAlignment;
  margin?: number | [number, number, number, number];
  padding?: number | [number, number, number, number];
  // Otras propiedades específicas de texto
}

export interface PdfSpacerElement {
  text: string; // '\n' o espacios
  margin?: number | [number, number, number, number];
}


export interface PdfFontFamily {
  normal: string;
  bold: string;
  italics: string;
  bolditalics: string;
}

export interface PdfFonts {
  [fontFamily: string]: PdfFontFamily;
}


export interface PdfDocumentDefinition {
  content: PdfContent[];
  styles?: Record<string, PdfStyleDefinition>;
  defaultStyle?: PdfStyleDefinition;
  fonts?: PdfFonts;
  images?: Record<string, string>;
  pageMargins?: [number, number, number, number];
  pageSize?: 'A4' | 'LETTER' | string;
  pageOrientation?: 'portrait' | 'landscape';
  // Otras propiedades globales
}

export interface PdfGenerateResult {
  buffer: Buffer;
  fileName: string;
}