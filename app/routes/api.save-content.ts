import { ActionFunction } from '@remix-run/node';
import { createBlock, getBlockCount } from '../models/block.server';

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const content = JSON.parse(String(formData.get('content')));

  const order = await getBlockCount();

  await createBlock({
    type: 'PAGE',
    content,
    order,
  });

  return null;
};