import axios from "axios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import API_BASE from "../config/api";

const fetchMissions = async () => {
  const { data } = await axios.get(`${API_BASE}/missions`);
  return data;
};

const fetchLogs = async () => {
  const { data } = await axios.get(`${API_BASE}/logs`);
  return data;
};

const fetchArmory = async () => {
  const { data } = await axios.get(`${API_BASE}/armory`);
  return data;
};

const fetchTroops = async () => {
  const { data } = await axios.get(`${API_BASE}/troops`);
  return data;
};

const fetchUsers = async (token) => {
  const { data } = await axios.get(`${API_BASE}/users`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
};

export const useMissions = () =>
  useQuery({
    queryKey: ["missions"],
    queryFn: fetchMissions,
    staleTime: 30000,
    retry: 2,
  });

export const useLogs = () =>
  useQuery({
    queryKey: ["logs"],
    queryFn: fetchLogs,
    staleTime: 30000,
    retry: 2,
  });

export const useArmory = () =>
  useQuery({
    queryKey: ["armory"],
    queryFn: fetchArmory,
    staleTime: 60000,
    retry: 2,
  });

export const useTroops = () =>
  useQuery({
    queryKey: ["troops"],
    queryFn: fetchTroops,
    staleTime: 30000,
    retry: 2,
  });

export const useUsers = (token) =>
  useQuery({
    queryKey: ["users", token],
    queryFn: () => fetchUsers(token),
    enabled: !!token,
    staleTime: 30000,
    retry: 2,
  });

export const useCreateMission = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload) => axios.post(`${API_BASE}/missions`, payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["missions"] }),
  });
};

export const useUpdateMission = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }) =>
      axios.put(`${API_BASE}/missions/${id}`, payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["missions"] }),
  });
};

export const useDeleteMission = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) => axios.delete(`${API_BASE}/missions/${id}`),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["missions"] }),
  });
};

export const useCreateLog = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload) => axios.post(`${API_BASE}/logs`, payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["logs"] }),
  });
};

export const useCreateTroop = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload) => axios.post(`${API_BASE}/troops`, payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["troops"] }),
  });
};
