import { observer } from "mobx-react-lite";
import { SearchOutlined } from '@ant-design/icons';
import React, { useRef, useState } from 'react';
import Highlighter from 'react-highlight-words';
import type { InputRef } from 'antd';
import { Button, Input, Space, Table } from 'antd';
import type { ColumnType, ColumnsType } from 'antd/es/table';
import type { FilterConfirmProps } from 'antd/es/table/interface';


interface DataType {
    number: number;
    key: string;
    name: string;
    publish: string;
    discount: number;
    stock: number;
    price: number;
    auther: string;
    print_time: string;
    readership: string;
    classification: string;
    address: string;
}

type DataIndex = keyof DataType;

const data: DataType[] = [

];

export default observer(() => {
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef<InputRef>(null);

    const handleSearch = (
        selectedKeys: string[],
        confirm: (param?: FilterConfirmProps) => void,
        dataIndex: DataIndex,
    ) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };

    const handleReset = (clearFilters: () => void) => {
        clearFilters();
        setSearchText('');
    };

    const getColumnSearchProps = (dataIndex: DataIndex): ColumnType<DataType> => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
            <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
                <Input
                    ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
                    style={{ marginBottom: 8, display: 'block' }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() => clearFilters && handleReset(clearFilters)}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Reset
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            confirm({ closeDropdown: false });
                            setSearchText((selectedKeys as string[])[0]);
                            setSearchedColumn(dataIndex);
                        }}
                    >
                        Filter
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            close();
                        }}
                    >
                        close
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered: boolean) => (
            <SearchOutlined style={{ color: filtered ? '#1677ff' : undefined }} />
        ),
        onFilter: (value, record) =>
            record[dataIndex]
                .toString()
                .toLowerCase()
                .includes((value as string).toLowerCase()),
        onFilterDropdownOpenChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100);
            }
        },
        render: (text) =>
            searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ''}
                />
            ) : (
                text
            ),
    });

    const columns: ColumnsType<DataType> = [
        {
            title: '图书编号',
            dataIndex: 'number',
            key: 'number',
            ...getColumnSearchProps('number'),
        },
        {
            title: '书名',
            dataIndex: 'name',
            key: 'name',
            ...getColumnSearchProps('name'),
        },
        {
            title: '出版社',
            dataIndex: 'publish',
            key: 'publish',
            ...getColumnSearchProps('publish'),
        }, {
            title: '定价',
            dataIndex: 'price',
            key: 'price',
            ...getColumnSearchProps('price'),
        }, {
            title: '折扣',
            dataIndex: 'discount',
            key: 'discount',
            ...getColumnSearchProps('discount'),
        }, {
            title: '库存',
            dataIndex: 'stock',
            key: 'stock',
            ...getColumnSearchProps('stock'),
        },
        {
            title: '作者',
            dataIndex: 'auther',
            key: 'auther',
            ...getColumnSearchProps('auther'),
        }, {
            title: '印刷时间',
            dataIndex: 'print_time',
            key: 'print_time',
            ...getColumnSearchProps('print_time'),
        },
        {
            title: '读者对象',
            dataIndex: 'readership',
            key: 'readership',
            ...getColumnSearchProps('readership'),
        },
        {
            title: '中图分类',
            dataIndex: 'classification',
            key: 'classification',
            ...getColumnSearchProps('classification'),
            // sorter: (a, b) => a.address.length - b.address.length,
            // sortDirections: ['descend', 'ascend'],
        },
    ];

    return <Table columns={columns} dataSource={data} />;
});
