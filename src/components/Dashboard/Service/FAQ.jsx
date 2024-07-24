import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createFAQ } from "../../../slices/serviceSlice";

const FAQ = () => {
  const dispatch = useDispatch();

  const { serviceId } = useSelector((state) => state.service);
  const {faqs} = useSelector((state) => state.service.service)

  console.log(serviceId);

  const [formData, setFormData] = useState({
    serviceId: "",
    question: "",
    answer: "",
  });

  formData.serviceId = serviceId;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(formData);

    dispatch(createFAQ({ formData }));
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-[50%] mx-auto mt-4 bg-white p-6 shadow-custom-shadow rounded-lg"
    >
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="question"
        >
          Question*
        </label>
        <input
          id="question"
          name="question"
          type="text"
          value={formData.question}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-md shadow-sm"
          placeholder="Enter Service Name"
          required
        />
      </div>

      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="answer"
        >
          Answer*
        </label>
        <textarea
          id="answer"
          name="answer"
          type="text"
          value={formData.answer}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-md shadow-sm"
          placeholder="Enter Service Details"
          required
        />
      </div>

      {faqs &&
        faqs.map((include) => {
          const {_id, question, answer } = include;

          return (
            <div key={_id}>
              <span className="flex">Question: {question}</span>
              <span className="flex">Answer: {answer}</span>
            </div>
          );
        })}

      <div className="flex mt-6">
        <button
          type="submit"
          className="bg-blue-500 text-white font-bold py-2 px-4 rounded-md"
        >
          Add
        </button>
      </div>
    </form>
  );
};

export default FAQ;
