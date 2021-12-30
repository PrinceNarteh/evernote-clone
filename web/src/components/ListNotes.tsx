import styled from "@emotion/styled";

const ListNotes = () => {
  return (
    <ListNotesStyle>
      <h2>All Notes</h2>
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
