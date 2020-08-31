function Index(props) {
  const { message } = props;
  return <div>Welcome to {message}</div>;
}
export async function getStaticProps(context) {
  return {
    props: {
      message: `Next.js!`
    }
  };
}
export default Index;
