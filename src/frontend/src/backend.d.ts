import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface CustomTemplate {
    id: string;
    created: Time;
    name: string;
    canvasState: string;
    category: TemplateCategory;
}
export type Time = bigint;
export interface PrebuiltTemplate {
    id: string;
    name: string;
    description: string;
    thumbnailHint: string;
    category: TemplateCategory;
}
export enum TemplateCategory {
    instagram = "instagram",
    old_money = "old_money"
}
export interface backendInterface {
    deleteCustomTemplate(id: string): Promise<void>;
    getAllCustomTemplates(): Promise<Array<CustomTemplate>>;
    getCustomTemplate(id: string): Promise<CustomTemplate>;
    getPrebuiltTemplates(): Promise<Array<PrebuiltTemplate>>;
    getTemplatesByCategory(category: TemplateCategory): Promise<{
        customTemplates: Array<CustomTemplate>;
        prebuiltTemplates: Array<PrebuiltTemplate>;
    }>;
    saveCustomTemplate(template: CustomTemplate): Promise<void>;
}
