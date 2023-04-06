import { SmileOutlined } from "@ant-design/icons";
import { Button, Result } from "antd";

const HomePage = () => {
  return (
    <Result
      icon={<SmileOutlined />}
      title="Welcome to the Website!"
      // extra={<Button type="primary">Next</Button>}
    />
  );
};

export default HomePage;
