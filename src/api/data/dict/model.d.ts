declare namespace API {
  type optionItem = {
    label: string;
    value: number;
  };
  type options = optionItem[];
  type DictInfo = {
    id: number;
    name: string;
    type: number;
    createdAt: string;
    updatedAt: string;
    remark: string;
    remarkId: number;
  };
  type DictList = DictInfo[];
  type addDictParams = {
    name: string;
    type: string;
    createdAt: string;
    updatedAt: string;
    remark: string;
    remarkId: number;
  };
  type updateDictParams = addDictParams & { id: number };
}
