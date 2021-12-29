import styled from "@emotion/styled";
import { GENERICS, MIXINS } from "./GlobalStyle";
import { FaSearch, FaSignOutAlt } from "react-icons/fa";

const Navigation = () => {
  return (
    <NavigationStyled>
      <div className="user-profile">
        <div>JD</div>
        <span>John Doe</span>
        <span>
          <FaSignOutAlt />
        </span>
      </div>
      <div className="search-input">
        <FaSearch />
        <input type="text" />
      </div>
    </NavigationStyled>
  );
};

const NavigationStyled = styled.div`
  height: 100%;
  width: 100%;
  max-width: 30rem;
  background-color: ${GENERICS.colorBlackCalm};
  color: #eee;
  font-size: 1.6rem;
  padding: 2rem;

  .user-profile {
    display: grid;
    grid-template-columns: auto 1fr 1fr;
    align-items: center;
    gap: 1rem;
    margin-bottom: 2rem;

    > div:first-child {
      width: 3rem;
      height: 3rem;
      background-color: ${GENERICS.primaryColorDark};
      ${MIXINS.va("center")}
      border-radius: 50%;
    }

    > span:last-child {
      justify-self: flex-end;
      cursor: pointer;
      transition: 0.3s;
      font-size: 2rem;
      padding: 0.5rem;

      &:hover {
        color: ${GENERICS.primaryColorDark};
      }
    }
  }

  .search-input {
    background-color: #777;
    display: flex;
    align-items: center;
    border-radius: 3rem;
    padding: 1rem 1.5rem;

    input {
      background: transparent;
      border: none;
      outline: none;
      width: 100%;
      margin-left: 1rem;
      font-size: 1.6rem;
      color: #eee;
    }
  }
`;

export default Navigation;
