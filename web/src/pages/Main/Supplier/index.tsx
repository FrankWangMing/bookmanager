import { observer } from "mobx-react-lite";
import { Items } from "./items";
import { Current } from "./Current";
import { Button, Col, Divider, Flex, Row, Space } from "antd";

export default observer(() => {
    return <div className="min-h-full">
        <Row gutter={16}>
            <Col span={8}>
                <Items />
            </Col>
            <Col span={16}>
                <Current />
            </Col>
        </Row>
    </div>
})
// 