import { useMutation } from '@apollo/client';

import { CREATE_REVIEW, DELETE_REVIEW } from '../graphql/mutations';

const useReview = (id) => {
  const [createMutation, result] = useMutation(CREATE_REVIEW);
  const [deleteMutation] = useMutation(DELETE_REVIEW);

  const createReview = async ({ repositoryName, ownerName, rating, text }) => {
    const { data } = await createMutation({
      variables: { review: { repositoryName, ownerName, rating, text } },
    });

    return data;
  };

  const deleteReview = async () => {
    if (!id) return;

    await deleteMutation({
      variables: { deleteReviewId: id },
    });
  };

  return { createReview, deleteReview, result };
};

export default useReview;
