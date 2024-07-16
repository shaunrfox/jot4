import { ActionFunction } from '@remix-run/node';
import { createBlock, getBlockCount } from './block.server';

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const content = JSON.parse(String(formData.get('content')));

  const order = await getBlockCount();

  await createBlock({
    type: 'TEXT',
    content,
    order,
  });

  return null;
};