const BASE_URL = "https://www.sankavollerei.com";

export async function getPopulerComic() {
  const res = await fetch(`${BASE_URL}/comic/populer`, {
    next: {
      revalidate: 3600,
    },
  });

  if (!res.ok) {
    throw new Error("Failed fetch populer");
  }

  return res.json();
}

export async function getTrendingComic() {
  const res = await fetch(`${BASE_URL}/comic/trending`, {
    next: {
      revalidate: 3600,
    },
  });

  if (!res.ok) {
    throw new Error("Failed fetch trending");
  }

  return res.json();
}

export async function getTerbaruComic() {
  const res = await fetch(`${BASE_URL}/comic/terbaru`, {
    next: {
      revalidate: 3600,
    },
  });

  if (!res.ok) {
    throw new Error("Failed fetch terbaru");
  }

  return res.json();
}

export async function searchComic(keyword: string) {
  const res = await fetch(`${BASE_URL}/comic/search?q=${keyword}`, {
    next: {
      revalidate: 3600,
    },
  });

  if (!res.ok) {
    throw new Error("Failed fetch search");
  }

  return res.json();
}

export async function getDetailComic(slug: string) {
  const res = await fetch(`${BASE_URL}/comic/comic/${slug}`, {
    next: {
      revalidate: 3600,
    },
  });

  if (!res.ok) {
    throw new Error("Failed fetch search");
  }

  return res.json();
}

export async function getChapterComic(slug: string) {
  const res = await fetch(
    `https://www.sankavollerei.com/comic/chapter/${slug}`,
    {
      cache: "no-store",
    },
  );

  if (!res.ok) {
    throw new Error("Failed get chapter");
  }

  return res.json();
}
