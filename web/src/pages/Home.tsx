import styled from "@emotion/styled";
import ListNotes from "../components/ListNotes";
import Navigation from "../components/Navigation";
import Wrapper from "../components/Wrapper";

function Home() {
  return (
    <HomeStyle>
      <Navigation />
      <ListNotes />
    </HomeStyle>
  );
}

const HomeStyle = styled(Wrapper)`
  display: flex;
`;

export default Home;
