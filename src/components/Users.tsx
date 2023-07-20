'use client';

import React from 'react';
import { Button, Form, Input, message } from 'antd';
import { schema } from '@/lib/validations/schema';
import { LoadingOutlined } from '@ant-design/icons';
import { Toaster, toast } from 'sonner';

interface IProps {
  name: string;
  phone: string;
}

const yupSync = {
  async validator({ field }: any, value: any) {
    await schema.validateSyncAt(field, { [field]: value });
  },
};

export function Users({ setShowScore, setShowForm }: any) {
  const [isPending, startTransition] = React.useTransition();

  const onFinish = ({ name, phone }: IProps) => {
    startTransition(async () => {
      try {
        await fetch('api/users', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name: name, phone: phone }),
        });

        toast.success(
          'Congratulations. Please scan the QR code to retrieve your ice cream'
        );
        setShowScore(true);
        setShowForm(false);
      } catch (error) {
        toast.error('Something went wrong. Please reload and try again.');
      }
    });
  };

  return (
    <>
      <Toaster richColors closeButton />
      <div className="w-full flex flex-col gap-y-7 bg-white p-6 shadow-xl rounded-md">
        <div className="">Please enter your name and phone below:</div>
        <div className="container">
          <Form name="basic" layout="vertical" onFinish={onFinish}>
            <Form.Item label="Full Name" name="name" required rules={[yupSync]}>
              <Input />
            </Form.Item>

            <Form.Item label="Phone" name="phone" required rules={[yupSync]}>
              <Input />
            </Form.Item>

            <Form.Item>
              <Button type="default" htmlType="reset" disabled={isPending}>
                Clear
              </Button>
              <Button
                type="primary"
                htmlType="submit"
                disabled={isPending}
                className="ml-2 bg-custom-color hover:bg-hover-color"
              >
                {isPending && (
                  <LoadingOutlined
                    className="mr-2 h-4 w-4"
                    aria-hidden="true"
                  />
                )}
                Submit
                <span className="sr-only">Submit</span>
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </>
  );
}
