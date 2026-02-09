import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

export function useContacts() {
  return useQuery({
    queryKey: ['contacts'],
    queryFn: () =>
      axios
        .get('https://65b36193770d43aba479a2f2.mockapi.io/users')
        .then((res) => res.data),
  });
}

export function useContact(contactId) {
  return useQuery({
    queryKey: ['contacts', contactId],
    queryFn: () =>
      axios
        .get(`https://65b36193770d43aba479a2f2.mockapi.io/users/${contactId}`)
        .then((res) => res.data),
  });
}

export function useDeleteContact() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (contactId) =>
      axios.delete(
        `https://65b36193770d43aba479a2f2.mockapi.io/users/${contactId}`
      ),
    onSuccess: () => {
      queryClient.invalidateQueries(['contacts']);
    },
  });
}
