import { Outlet, Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { auth } from "../firebase";
import { HomeIcon } from "../atoms/icons/Home";
import { UserIcon } from "../atoms/icons/User";
import { ArrowLeftEnd } from "../atoms/icons/ArrowLeftEnd";
import useToastStore from "../store/toast";
import Toast from "../store/toast";

const Wrapper = styled.div`
  display: grid;
  gap: 20px;
  grid-template-columns: 1fr 4fr;
  height: 100%;
  padding: 50px 0px;
  width: 100%;
  max-width: 860px;
`;

const Menu = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

const MenuItem = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid black;
  height: 50px;
  width: 50px;
  border-radius: 50%;
  svg {
    width: 30px;
    fill: black;
  }
  &.log-out {
    border-color: tomato;
    svg {
      fill: tomato;
    }
  }
`;


export default function Layout() {
    const navi = useNavigate();
    const { text, isShowing } = useToastStore();
    const onLogOut = async () => {
        if(confirm("로그아웃 하시겠습니까?")){
            await auth.signOut;
            navi("/login")
        } else{
            return;
        }
    }
    return(
        <>
            <Wrapper>
                <Menu>
                    {/* Menu 네비게이션 바 */}
                    <Link to="/">
                        <MenuItem>
                            <HomeIcon />
                        </MenuItem>
                    </Link>
                    <Link to="/profile">
                        <MenuItem>
                            <UserIcon />
                        </MenuItem>
                    </Link>
                    <Link>
                        <MenuItem className="log-out" onClick={onLogOut}>
                            <ArrowLeftEnd />
                        </MenuItem>
                    </Link>
                </Menu>
                <Toast isVisible={isShowing}>{text}</Toast>
            <Outlet />
      </Wrapper>
        </>
    )
}