

export class Board {
  public categories: string[] = ['To do', 'Do today', 'Doing', 'Done'];
  public tasks: any = [
    [// All Tasks from first category:
      {
        title: 'Test 1',
        content: 'Dies ist eine Taskbeschreibung der Kategory To-do.'
      }
    ],
    [// All Tasks from second category:
      {
        title: 'Test 2',
        content: 'Dies ist eine Taskbeschreibung der Kategory Do today.'
      }
    ],
    [// All Tasks from third category:
      {
        title: 'Test 3',
        content: 'Dies ist eine Taskbeschreibung der Kategory Doing.'
      }
    ],
    [// All Tasks from fourth category:
      {
        title: 'Test 4',
        content: 'Dies ist eine Taskbeschreibung der Kategory Done.'
      }
    ]
  ];
} 