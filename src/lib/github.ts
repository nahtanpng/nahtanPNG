export type ContributionLevel = 0 | 1 | 2 | 3 | 4;

export type ContributionWeek = {
  label: string;
  days: (ContributionLevel | null)[];
};

export type Contributions = {
  total: number | null;
  weeks: ContributionWeek[];
};

type ApiLevel = "NONE" | "FIRST_QUARTILE" | "SECOND_QUARTILE" | "THIRD_QUARTILE" | "FOURTH_QUARTILE";

type ApiResponse = {
  data?: {
    user: {
      contributionsCollection: {
        contributionCalendar: {
          totalContributions: number;
          weeks: { contributionDays: { date: string; weekday: number; contributionLevel: ApiLevel }[] }[];
        };
      };
    } | null;
  };
};

const LEVELS: Record<ApiLevel, ContributionLevel> = {
  NONE: 0,
  FIRST_QUARTILE: 1,
  SECOND_QUARTILE: 2,
  THIRD_QUARTILE: 3,
  FOURTH_QUARTILE: 4,
};

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const QUERY = `
  query ($login: String!) {
    user(login: $login) {
      contributionsCollection {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              date
              weekday
              contributionLevel
            }
          }
        }
      }
    }
  }
`;

function weekStart(date: string, weekday: number) {
  const d = new Date(`${date}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() - weekday);
  return d;
}

function emptyCalendar(): ContributionWeek[] {
  return Array.from({ length: 53 }, () => ({ label: "", days: Array<ContributionLevel>(7).fill(0) }));
}

export async function getContributions(login: string): Promise<Contributions> {
  const token = process.env.GITHUB_TOKEN;
  if (!token) return { total: null, weeks: emptyCalendar() };

  try {
    const res = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: { Authorization: `bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify({ query: QUERY, variables: { login } }),
      next: { revalidate: 3600 },
    });
    if (!res.ok) throw new Error(`GitHub API responded ${res.status}`);

    const json = (await res.json()) as ApiResponse;
    const calendar = json.data?.user?.contributionsCollection.contributionCalendar;
    if (!calendar) throw new Error("GitHub API returned no calendar");

    let prevMonth = -1;
    const weeks = calendar.weeks.map((week, w) => {
      const days: (ContributionLevel | null)[] = Array(7).fill(null);
      week.contributionDays.forEach((day) => (days[day.weekday] = LEVELS[day.contributionLevel]));

      const first = week.contributionDays[0];
      const start = weekStart(first.date, first.weekday);
      const month = start.getUTCMonth();
      let label = "";
      if (month !== prevMonth) {
        if (w > 0 || start.getUTCDate() <= 14) label = MONTHS[month];
        prevMonth = month;
      }
      return { label, days };
    });

    return { total: calendar.totalContributions, weeks };
  } catch (error) {
    console.error("Failed to load GitHub contributions", error);
    return { total: null, weeks: emptyCalendar() };
  }
}
