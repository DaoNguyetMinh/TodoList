import React, { useState } from 'react';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const editForm = ({ todo, updateEdit }) => {
  const [valueInput, setValueInput] = useState(todo.name);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateEdit(todo.id, valueInput);
  };

  return (
    <div>
      <form action="submit" onSubmit={handleSubmit}>
        <div className="flex w-full items-center space-x-2">
          <Input
            type="text"
            value={valueInput}
            onChange={(e) => setValueInput(e.target.value)}
          />
          <Button className="bg-blue-950" type="submit">
            Edit
          </Button>
        </div>
      </form>
    </div>
  );
};

export default editForm;
