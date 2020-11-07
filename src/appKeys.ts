/**
 * Constants
 */

export enum AppLabels {
  statusLabel = 'Active'
}

export enum AppStatusForm {
  active = 'Active',
  inactive = 'Inactive',
  inProgress = 'In Progress',
  acepted = 'Acepted'
}

export namespace QVRCuratedProformColumns {
  export const ID = {prop: 'id', name: 'Id Proforma Interna'};
  export const NUMBER_PROFORM = {prop: 'number_proform', name: 'Número Proforma'};
  export const USER_ID = {prop: 'user_id', name: 'Vendedor'};
  export const COLLEGES_ID = {prop: 'college_id', name: 'Colegios'};
  export const CLIENT_ID = {prop: 'client_id', name: 'Clientes'};
  export const DATE_PROFORM = {prop: 'date_proform', name: 'Fecha Registro'};
  export const DATE_DELIVERY = {prop: 'date_delivery', name: 'Fecha Entrega'};
  export const TYPE_CLIENT_SALE = {prop: 'type_client_sale', name: 'Canal de Venta'};
  export const AGREEMENT = {prop: 'agreement', name: 'Convenio'};
}

export namespace QVRCuratedProformDetailColumns {
  export const ID = {prop: 'id', name: 'Id'};
  export const PROFORM_ID = {prop: 'proform_id', name: 'proform_id'};
  export const DEGREE = {prop: 'degree', name: 'Grado'};
  export const PRODUCT_ID = {prop: 'product_id', name: 'product_Id'};
  export const QUANTITY = {prop: 'quantity', name: 'Cantidad'};
  export const PRICE = {prop: 'price', name: 'Precio'};
  export const SUB_TOTAL = {prop: 'subtotal', name: 'Subtotal'};
  export const SALE_DIRECT = {prop: 'sale_direct', name: 'DIRECTO'};
  export const SALE_DONATION = {prop: 'sale_donation', name: 'Donación'};
  export const SALE_EXTERNAL_LIBRARY = {prop: 'sale_external_library', name: 'Librería'};
  export const SALE_EVENT = {prop: 'sale_event', name: 'Premios'};
  export const SALE_TEACHER = {prop: 'sale_teacher', name: 'Profesores'};
  export const SALE_INFRASTRUCTURE = {prop: 'sale_infrastructure', name: 'Infraestructura'};
  export const SALE_SCHOLARSHIPS = {prop: 'sale_scholarships', name: 'Becas'};
  export const SALE_STAFF = {prop: 'sale_staff', name: 'Equipos'};
  export const SALE_TRAINING = {prop: 'sale_training', name: 'Capacitación'};
  export const CAPEX = {prop: 'capex', name: 'CAPEX'};
  export const TOTAL = {prop: 'total', name: 'Total'};
  export const QUANTITY_CHECK = {prop: 'quantity_check', name: 'Entregado'};
}
