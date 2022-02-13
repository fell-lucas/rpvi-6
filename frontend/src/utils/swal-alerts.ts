import { SweetAlertOptions } from 'sweetalert2';

export const warningAlert = {
  icon: 'warning',
  title: 'Atenção! Esta ação não poderá ser desfeita.',
  text: 'Confira os dados antes de enviar.',
  showCancelButton: true,
  confirmButtonText: 'Enviar',
  cancelButtonText: 'Cancelar',
  confirmButtonColor: '#009045',
} as SweetAlertOptions;

export const errorAlert = {
  icon: 'error',
  title: 'Erro. Algo deu errado.',
  text: 'Por favor, tente novamente. Estamos trabalhando à todo o vapor para arrumar as coisas por aqui.',
  confirmButtonText: 'Ok',
  confirmButtonColor: '#009045',
} as SweetAlertOptions;
