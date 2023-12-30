import { Button, Space, Input, Divider, List, Avatar } from "antd"
import { SearchProps } from "antd/es/input";
import { observer } from "mobx-react-lite"
import { useState } from "react";
const { Search } = Input;


const data = [
    {
        id: "1",
        title: 'Ant Design Title 1',
    },
    {
        id: "2",
        title: 'Ant Design Title 2',
    },
    {
        id: "3",
        title: 'Ant Design Title 3',
    },
    {
        id: "4",
        title: 'Ant Design Title 4',
    },
];
export const Items = observer(() => {
    const onSearch: SearchProps['onSearch'] = (value, _e, info) => console.log(info?.source, value);
    const [select, setSelect] = useState("1")
    return <div className="border-spacing-1 min-h-4  ">
        <div className="h-18 items-center flex">
            <Search
                className="flex-1 w-full"
                placeholder="输入供应商名称或供应商代码"
                allowClear
                enterButton="Search"
                size="large"
                onSearch={onSearch}
            />
            <Button type="primary"
                size="large"
                className="ml-2" >新增供应商</Button>
        </div>
        <div className="mt-4 max-h-full ">
            {
                <List
                    bordered={true}
                    itemLayout="horizontal"
                    dataSource={data}
                    renderItem={(item, index) => (
                        <List.Item onClick={() => setSelect(item.id)} className={`cursor-pointer hover:bg-slate-400 ${item.id == select && 'bg-gray-500'}`}   >
                            <List.Item.Meta
                                avatar={<Avatar src={`https://xsgames.co/randomusers/avatar.php?g=pixel&key=${index}`} />}
                                title={<a href="https://ant.design">{item.title}</a>}
                                description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                            />
                        </List.Item>
                    )}
                />
            }
        </div>
    </div>
})

