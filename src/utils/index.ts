import _ from "lodash";
import { Types } from "mongoose";

export const getInfoData = ({ fields = [], object = {} }: { fields: string[]; object: any }) => {
  return _.pick(object, fields);
};

export const getSelectData = (select: any[] = []) => {
  return Object.fromEntries(select.map((el) => [el, 1]));
};

export const unGetSelectData = (select: any[] = []) => {
  return Object.fromEntries(select.map((el) => [el, 0]));
};

export const checkEnable = (value: any) => {
  return value === "true";
};

export const convert2ObjectId = (id: string) => {
  return new Types.ObjectId(id);
};

export const removeAttrUndefined = (object: any) => {
  Object.keys(object).forEach((key) => {
    if (object[key] === undefined || object[key] === null) delete object[key];
  });

  return object;
};

export const updateNestedObjectParser = (obj: any) => {
  const final: any = {};
  Object.keys(obj).forEach((i) => {
    if (typeof obj[i] === "object" && !Array.isArray(obj[i])) {
      const response = updateNestedObjectParser(obj[i]);
      Object.keys(obj[i]).forEach((j) => {
        final[`${i}.${j}`] = response[j];
      });
    } else {
      final[i] = obj[i];
    }
  });

  return final;
};
