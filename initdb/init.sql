/* -- Sucursales
INSERT INTO sucursal (direccion, telefono, dias_previos_aviso)
VALUES 
('Av. Siempre Viva 742', '123456789', 5),
('Calle Falsa 123', '987654321', 3);

-- Proveedores
INSERT INTO proveedor (nombre, contacto)
VALUES 
  ('Laboratorios ACME', 'acme@proveedor.com'),
  ('Distribuidora SaludAR', 'saludar@proveedor.com'),
  ('Farmacéutica Delta', 'contacto@deltafarma.com');

-- Productos
INSERT INTO producto (nombre, categoria, tipo, umbral_stock, precio_unitario)
VALUES 
  -- Venta libre
  ('Paracetamol 500mg', 'MEDICAMENTO', 'VENTA_LIBRE', 20, 500),
  ('Crema hidratante', 'COSMÉTICO', 'VENTA_LIBRE', 10, 1200),
  ('Jeringas descartables 5ml', 'INSUMO', 'VENTA_LIBRE', 50, 150),
  ('Guantes de látex (par)', 'INSUMO', 'VENTA_LIBRE', 100, 100),

  -- Bajo prescripción
  ('Ibuprofeno 400mg', 'MEDICAMENTO', 'BAJO_PRESCRIPCION', 30, 650),
  ('Antialérgico Loratadina', 'MEDICAMENTO', 'BAJO_PRESCRIPCION', 25, 720),

  -- Tratamiento especial
  ('Morfinas Inyectables 10mg', 'MEDICAMENTO', 'TRATAMIENTO_ESPECIAL', 5, 3200),
  ('Interferón Alfa 2B', 'MEDICAMENTO', 'TRATAMIENTO_ESPECIAL', 3, 8200),
  ('Rituximab 100mg', 'MEDICAMENTO', 'TRATAMIENTO_ESPECIAL', 2, 15200); */