'use client';

import { Typography } from 'antd';
import { Button, Form, Radio, Space } from 'antd';
import type { RadioChangeEvent } from 'antd';
import { Dispatch, SetStateAction, useState } from 'react';

const { Title, Text } = Typography;

interface WelcomeProps {
  setProfession: Dispatch<SetStateAction<null>>;
}

export function Welcome({ setProfession }: WelcomeProps) {
  const [value, setValue] = useState(null);

  const onChange = (event: RadioChangeEvent) => {
    setValue(event.target.value);
  };

  return (
    <div className="w-full flex flex-col gap-y-4 p-6 bg-white shadow-xl rounded-md">
      <div className="leading-relaxed">
        <p className="text-xs text-gray-500">Welcome to</p>
        <Title level={4}>2023 Kerry Science Festival</Title>
      </div>
      <div className="flex flex-col gap-y-4">
        <Text italic>Select an option below to continue</Text>
        <Form name="welcome" layout="vertical">
          <Form.Item label="I am a:" name="job" required>
            <Radio.Group value={value} onChange={onChange}>
              <Space direction="vertical">
                <Radio value={'student'}>
                  Primary or Secondary School Student
                </Radio>
                <Radio value={'profession'}>
                  Third-Level Student or Professional
                </Radio>
              </Space>
            </Radio.Group>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              disabled={value === null ? true : false}
              className="bg-custom-color hover:bg-hover-color"
              onClick={() => setProfession(value)}
            >
              Continue
              <span className="sr-only">Continue</span>
            </Button>
          </Form.Item>

          <p className="text-xs text-blue-600">
            We recommend not to reload/refresh the browser/platform during the
            quiz.
          </p>
        </Form>
      </div>
    </div>
  );
}
