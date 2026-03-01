import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { CustomTemplate } from "../backend";
import type { TemplateCategory } from "../backend";
import { useActor } from "./useActor";

export function usePrebuiltTemplates() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["prebuiltTemplates"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getPrebuiltTemplates();
    },
    enabled: !!actor && !isFetching,
    staleTime: 1000 * 60 * 5,
  });
}

export function useCustomTemplates() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["customTemplates"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllCustomTemplates();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useTemplatesByCategory(category: TemplateCategory) {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["templatesByCategory", category],
    queryFn: async () => {
      if (!actor) return { customTemplates: [], prebuiltTemplates: [] };
      return actor.getTemplatesByCategory(category);
    },
    enabled: !!actor && !isFetching,
    staleTime: 1000 * 60 * 5,
  });
}

export function useSaveTemplate() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (template: CustomTemplate) => {
      if (!actor) throw new Error("No actor available");
      await actor.saveCustomTemplate(template);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["customTemplates"] });
      queryClient.invalidateQueries({ queryKey: ["templatesByCategory"] });
    },
  });
}

export function useDeleteTemplate() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      if (!actor) throw new Error("No actor available");
      await actor.deleteCustomTemplate(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["customTemplates"] });
      queryClient.invalidateQueries({ queryKey: ["templatesByCategory"] });
    },
  });
}
