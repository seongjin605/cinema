import Header from './Header';

const layoutStyle = {
  margin: 20,
  padding: 20,
  border: '1px solid #FF385C'
};

interface Props {
  name: string;
  query: string | string[];
}

const Layout: React.FC<Props> = props => {
  return (
    <div style={layoutStyle}>
      <Header />
      {props.name}
    </div>
  );
};

export default Layout;
