import styled from "@emotion/styled";
import { gql, useQuery } from "@apollo/client";

const LIST_NOTES_QUERY = gql`
  query ListNotes {
    listNotes {
      id
      title
      content
    }
  }
`;

const ListNotes = () => {
  const { data, error, loading } = useQuery(LIST_NOTES_QUERY);

  return (
    <ListNotesStyle>
      <h2>All Notes</h2>
      {JSON.stringify(data.listNotes)}
    </ListNotesStyle>
  );
};

const ListNotesStyle = styled.div`
  height: 100%;
  width: 100%;
  max-width: 35rem;
  background-color: #ddd;
  padding: 2rem;

  > h2 {
    color: #555;
    font-size: 1.6rem;
  }
`;

export default ListNotes;
