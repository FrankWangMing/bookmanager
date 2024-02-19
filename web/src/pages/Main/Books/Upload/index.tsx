import {
  Tabs,
  UploadProps,
  message,
  Button,
  Upload,
  Select,
  notification
} from 'antd'
import {
  entries,
  fromPairs,
  get,
  includes,
  isEqual,
  isNull,
  keys,
  map,
  uniqueId,
  values
} from 'lodash'
import { observer } from 'mobx-react-lite'
import { Dispatch, useState } from 'react'
import { read, utils } from 'xlsx'
import { UploadOutlined } from '@ant-design/icons'
import UploadTable from './UploadTable'
import { RcFile } from 'antd/es/upload'
import { viewmodel } from 'model'

export interface President {
  中图分类: string
  书名: string
  作者: string
  出版社: string
  印刷时间: any
  书号: string
  定价: string
  库位: string
  库存: string
  开本: string
  折扣: string
  条码: string
  读者对象: string
}

export default observer(
  ({
    setIsModalOpen,
    handleOk
  }: {
    handleOk: any
    setIsModalOpen: Dispatch<boolean>
  }) => {
    const [tabItems, setTabItems] = useState<any>([])
    const [booksdata, setBooksData] = useState<Map<string, any[]>>(new Map())
    const [activeKey, setActiveKey] = useState<string>('')
    const [supplierCode, setSupplierCode] = useState<string>(
      viewmodel.supplierModel.supplierList[0]?.code
    )
    const [uploadLoading, setUploadLoading] = useState(false)
    const onChange = (key: string) => {
      console.log(key)
      setActiveKey(key)
    }
    const createItem = (file: RcFile, data: President[]) => {
      const newPanes = [...tabItems]
      newPanes.push({
        key: file.uid,
        label: file.name,
        closable: true,
        children: (
          <UploadTable
            key={uniqueId()}
            data={map(data, (i) => ({ ...i }))}
          ></UploadTable>
        )
      })
      setTabItems(newPanes)
      setActiveKey(file.uid)
      setBooksData(booksdata.set(file.uid, data))
    }

    const lllll = (data: President, idx: number) => {
      return ['书名', '书号', '出版社', '定价']
        .map((i) => {
          return { name: i, index: idx, status: includes(keys(data), i) }
        })
        .filter((i) => !i.status)
    }
    const checkFile = (data: President[]) => {
      console.log('data', data)
      return data.map((i, idx) => {
        console.log(i)
        return {
          ...i,
          status: { ...lllll(i, idx) }
        }
      })
    }

    const props: UploadProps = {
      name: 'file',
      showUploadList: false,
      beforeUpload(file) {
        return new Promise((resolve, reject) => {
          const reader = new FileReader()
          reader.onload = (e) => {
            if (e.target == null) return
            const arrayBuffer = e.target.result

            if (isNull(arrayBuffer)) return

            const wb = read(arrayBuffer, { cellDates: true })
            console.log(wb)
            const ws = wb.Sheets[wb.SheetNames[0]] // get the first worksheet

            const data: President[] = utils.sheet_to_json<President>(ws, {
              // header: 1
            }) // generate objects
            createItem(file, checkFile(data))
            resolve(false)
          }
          reader.onerror = (error) => {
            reject()
          }
          reader.readAsArrayBuffer(file)
        })
      },
      onChange(info) {
        if (info.file.status !== 'uploading') {
          console.log(info.file, info.fileList)
        }
        if (info.file.status === 'done') {
          console.log(info)
          message.success(`${info.file.name} file uploaded successfully`)
        } else if (info.file.status === 'error') {
          message.error(`${info.file.name} file upload failed.`)
        }
      }
    }
    /* the component state is an array of objects */

    /* Fetch and update the state once */
    const getKey = (value: string) => {
      return {
        // 条码: 'j',
        书号: 'bookNumber',
        书名: 'name',
        出版社: 'publish',
        定价: 'price',
        折扣: 'discount',
        库存: 'stock',
        开本: 'format',
        作者: 'author',
        印刷时间: 'printTime',
        中图分类: 'classification',
        读者对象: 'readership',
        库位: 'address'
      }[value]
    }
    const uploadBooks = () => {
      setUploadLoading(true)
      viewmodel.booksModel
        .uploadManyBooks(
          Array.from(booksdata.values()).map((i) => {
            return i.map((_i) => {
              return {
                ...fromPairs(
                  entries(_i)
                    .filter((i) => i[0] !== 'status')
                    .map((i) => {
                      return [getKey(i[0]), String(i[1])]
                    })
                ),
                supplierCode
              }
            })
          })
        )
        .then((i) => {
          console.log(i)
          setTimeout(() => {
            setUploadLoading(false)
            if (get(i, 'data.CreateManyBook', 0) == 1) {
              notification.success({
                message: '上传成功',
                description: `一共上传了${Array.from(booksdata.values()).reduce(
                  (pre, current) => {
                    return (pre += current.length)
                  },
                  0
                )}条数据`
                // duration: 600
              })
              setIsModalOpen(false)
              setTimeout(() => {
                handleOk()
              }, 200)
            }
          }, 3000)
        })
    }
    const clearBooks = () => {
      setTabItems([])
      setBooksData(new Map())
    }
    const checkBooks = (books: Map<string, any[]>) => {
      let result = false
      Array.from(books.values()).map((i) => {
        console.log(i)
        i.forEach((_i) => {
          if (values(_i.status).length > 0) result = true
        })
      })
      return result
    }
    return (
      <div className="w-full">
        <Tabs
          tabBarExtraContent={{
            left: (
              <Upload {...props} className="mb-1 mr-3">
                {/* eslint-disable-next-line tailwindcss/no-custom-classname */}
                <Button className="tabs-extra-demo-button">选择文件</Button>
              </Upload>
            ),
            right: (
              <>
                <Button
                  className="mr-2"
                  onClick={() => {
                    clearBooks()
                  }}
                  disabled={booksdata.size == 0 || checkBooks(booksdata)}
                  danger
                >
                  一键清空
                </Button>
                <span>供应商：</span>
                <Select
                  value={supplierCode}
                  onChange={(value) => {
                    console.log(value)
                    setSupplierCode(value)
                  }}
                  style={{ width: 120 }}
                >
                  {viewmodel.supplierModel.supplierList.map((i: any) => {
                    return <Select.Option key={i.code}>{i.name}</Select.Option>
                  })}
                </Select>
                <Button
                  icon={<UploadOutlined />}
                  className="ml-2"
                  onClick={() => {
                    uploadBooks()
                  }}
                  disabled={booksdata.size == 0 || checkBooks(booksdata)}
                  type="primary"
                  loading={uploadLoading}
                >
                  一键上传
                </Button>
              </>
            )
          }}
          activeKey={activeKey}
          type="card"
          items={tabItems}
          onChange={onChange}
        />
      </div>
    )
  }
)
