import React, { useState } from 'react';
import { ALLOWED_AVATAR_FILE_TYPES } from './constants';
import styles from './style.module.css';
import { SubmitButton } from '../../buttons/Submit/SubmitButton';
import { Avatar } from '../../Avatar/Avatar';
import { LoginFormData } from './types';

type Props = {
  handleSubmitData(data: LoginFormData): void;
};

export function LoginForm(props: Props) {
  const [currentAvatarUrl, setCurrentAvatarUrl] = useState<string | null>(null);

  const converFileToBase64 = (file: File): void => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => setCurrentAvatarUrl(reader.result as string);
  };

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    const file: File | undefined = event.target.files?.[0];

    if (!file || !ALLOWED_AVATAR_FILE_TYPES.includes(file.type)) {
      setCurrentAvatarUrl(null);
      return;
    }
    converFileToBase64(file);
  };

  const handleSubmit = (data: FormData): void => {
    if (currentAvatarUrl) {
      props.handleSubmitData({
        name: data.get('name')?.toString() ?? '',
        avatarSrc: currentAvatarUrl,
      });
    }
  };

  return (
    <form action={handleSubmit} className={styles.container}>
      <input type="text" placeholder="YOUR NAME" name="name" required />
      <input
        type="file"
        placeholder="CHOOSE YOUR AVATAR"
        accept="image/jpeg"
        onChange={handleFileChange}
        required
        name="avatar"
      />
      {!!currentAvatarUrl && <Avatar fileUrl={currentAvatarUrl} />}
      <SubmitButton />
    </form>
  );
}
