/// <reference types="@workadventure/iframe-api-typings" />

export async function webOut(id = 1, chapter = 1, test = 1, msg = 'Hi') {
  try {
    // 👇️ const response: Response
    const response = await fetch('http://localhost:1880/space', {
      method: 'POST',
      body: JSON.stringify({
		  userId: id,
		  chapterNum: chapter,
		  testNum: test,
		  content: msg,
      }),
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Error! status: ${response.status}`);
    }

    // 👇️ const result: CreateUserResponse
    const result = (await response.json());
	console.log('original message:', result.content, result.userId, result.chapterNum, result.testNum)
	console.log(WA.player.name, 'has', result.message);

    return result;
  } catch (error) {
    if (error instanceof Error) {
      console.log('error message: ', error.message);
      return error.message;
    } else {
      console.log('unexpected error: ', error);
      return 'An unexpected error occurred';
    }
  }
}

export async function webVoteReset() {
  try {
    // 👇️ const response: Response
    const response = await fetch('https://poll.toekomst.school/reset', {
      method: 'POST',
      body: JSON.stringify({
      }),
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Error! status: ${response.status}`);
    }

    // 👇️ const result: CreateUserResponse
    const result = (await response.json());

    return result;
  } catch (error) {
    if (error instanceof Error) {
      console.log('error message: ', error.message);
      return error.message;
    } else {
      console.log('unexpected error: ', error);
      return 'An unexpected error occurred';
    }
  }
}

export async function webVoteUpdate(opt = 'Option A') {
  try {
    // 👇️ const response: Response
    const response = await fetch('https://poll.toekomst.school/vote', {
      method: 'POST',
      body: JSON.stringify({
		  option: opt,
      }),
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Error! status: ${response.status}`);
    }

    // 👇️ const result: CreateUserResponse
    const result = (await response.json());

    return result;
  } catch (error) {
    if (error instanceof Error) {
      console.log('error message: ', error.message);
      return error.message;
    } else {
      console.log('unexpected error: ', error);
      return 'An unexpected error occurred';
    }
  }
}

