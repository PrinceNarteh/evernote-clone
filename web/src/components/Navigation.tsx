import styled from "@emotion/styled";
import { GENERICS, MIXINS } from "./GlobalStyle";
import { FaBook, FaPlus, FaSearch, FaSignOutAlt, FaStar } from "react-icons/fa";

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
      <div className="new-note">
        <FaPlus />
        <span>New Note</span>
      </div>
      <ul className="nav-menus">
        <li className="active">
          <FaBook />
          <span>All Notes</span>
        </li>
        <li>
          <FaStar />
          <span>Favorite Note</span>
        </li>
      </ul>
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
    padding: 0.7rem 1.5rem;
    margin-bottom: 1.5rem;

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

  .new-note {
    cursor: pointer;
    background-color: ${GENERICS.primaryColorDark};
    border-radius: 3rem;
    padding: 0.7rem 1.5rem;
    ${MIXINS.va("center")}

    > span {
      margin-left: 1rem;
    }
  }

  .nav-menus {
    margin-top: 3rem;

    > li {
      position: relative;
      ${MIXINS.va("left")};
      padding: 0.5rem 0;
      cursor: pointer;
      gap: 1rem;

      &:hover {
        color: ${GENERICS.primaryColor};
      }
    }

    .active {
      color: ${GENERICS.primaryColor};
    }

    .active::after {
      content: "<";
      position: absolute;
      right: 0;
      font-weight: bold;
    }
  }
`;

export default Navigation;
