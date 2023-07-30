declare namespace QUERY {
  // commonPage页面的所有条件参数
  type formState = {
    deptName: String | Number;
    pickDate: Array<String>;
    typeName: String | Number;
    diagnosisName: String | Number;
    periodName: String | Number;
    operaName: String | Number;
    doctorName: String | Number;
    orderName: String | Number;
    numName: String | Number;
    selfDeptName: String[];
    sumTypeName: String | Number;
    HISParentId: String | Number;
  };
  // 用于保存点击最上级科室的参数
  type centerState = {
    pickDate: Array<String>;
    sumTypeName: String | Number;
    HISParentId: String | Number;
  };
}
