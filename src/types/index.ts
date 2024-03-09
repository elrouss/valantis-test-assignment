import React from 'react';

export interface IBtn extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string;
  ariaLabel?: string;
  extraClass?: string;
}

export interface IGoodsItem {
  id: string;
  product: string | null;
  brand: string | null;
  price: number | null;
}

export interface IGoodsTable {
  caption?: string;
  head: string[];
  body: IGoodsItem[];
  currentPage: number;
  pageSize?: number;
  totalCount: number;
}

export interface IPaginationData {
  totalCount: number;
  pageSize?: number;
  siblingCount?: number;
  currentPage: number;
}

export interface IGoodsApiParams {
  offset?: number;
  limit?: number;
}

export interface IGoodsApiParamsExtended extends IGoodsApiParams {
  field: 'product' | 'brand' | 'price';
}

export interface IRadio {
  label: string;
  value: string;
}

export interface IFilters {
  name: string;
  fields: IRadio[];
}

export interface IFormWithTable {
  form: {
    input: {
      placeholder: string;
    };
    btn: string;
  };
  table: IGoodsTable;
  filters: IFilters;
}

export type TFiltersValues = 'product' | 'brand' | 'price' | 'reset';

export interface IGetIds {
  action: 'get_ids';
  params?: IGoodsApiParams;
}

export interface IGetItems {
  action: 'get_items';
  params: {
    ids: string[];
  };
}

export interface IGetFields {
  action: 'get_fields';
  params?: IGoodsApiParamsExtended;
}

export interface IFilter {
  action: 'filter';
  params: Record<TFiltersValues, string | number>;
}
