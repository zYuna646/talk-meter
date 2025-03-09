export interface Class {
  id: number;
  name: string;
}

export interface Student {
  id: number;
  name: string;
  class_id: number;
  nisn: string;
  gender: string;
}

export interface FloatingButtonModalProps {
  fetchData: () => void;
  data: any;
  setData: React.Dispatch<React.SetStateAction<any>>;
  modalVisible: boolean;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}


export interface RowItemsProps {
    fetchData: () => void;
    item: any
    setData: React.Dispatch<React.SetStateAction<any>>;
    modalVisible: boolean;
    setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  }