import { ErrorPopupState } from 'src/core/redux/types';

interface Dictionary {
  [key: string]: ErrorPopupState;
}

const buttonClose = {
  id: 'btn-error-close',
  cta: 'Kembali',
};

const dictionary: Dictionary = {
  GENERAL_ERROR: {
    open: true,
    title: 'Terjadi Kesalahan',
    message: 'Permintaan anda tidak berhasil untuk diproses, mohon ulangi kembali',
    action: [buttonClose],
  },
  LOGIN: {
    open: true,
    title: 'Gagal Masuk',
    message: 'Username atau password yang anda masukan salah',
    action: [{ ...buttonClose, cta: 'Ok' }],
  },
};

export default dictionary;
