import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useDeleteContact, useContact } from '../services/tanStack.js';
export default function Contact() {
  const { contactId } = useParams();

  const { data: contact, isLoading, error } = useContact(contactId);
  const deleteMutation = useDeleteContact();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;
  const handleDelete = () => {
    deleteMutation.mutate(contactId, {
      onSuccess: () => {
        history.push('/');
      },
    });
  };

  return (
    <div id="contact">
      <div>
        <img key={contact.avatar} src={contact.avatar || null} />
      </div>

      <div>
        <h1 data-testid="full_name">
          {contact.first_name || contact.last_name ? (
            <>
              {contact.first_name} {contact.last_name}
            </>
          ) : (
            <i>No Name</i>
          )}{' '}
        </h1>

        {contact.email && (
          <p>
            <a target="_blank" href={`mailto:${contact.email}`}>
              {contact.email}
            </a>
          </p>
        )}

        {contact.description && <p>{contact.description}</p>}

        <div>
          <button className="delete" onClick={handleDelete}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
