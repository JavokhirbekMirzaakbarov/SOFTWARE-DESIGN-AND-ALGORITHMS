export const MIN_GRADE_WARNING_TEXT =
  "Minimum grade to successfully complete the course - 60%.";
export const ACTION_TO_IMPROVE_TEXT =
  'Please, provide review comments, set draft grade and click "Send back for updates" button in the Learn.';
export const SUCCESSFUL_GRADE_TEXT_WITH_IMPROVEMENT =
  'Please, provide a draft grade and click "Send back for updates" button in the Learn. If student is happy with grade click "Mark as passed" button';
export const SUCCESSFUL_GRADE_TEXT =
  'Please, provide a grade and click "Mark as passed" button';

export const MAX_GRADE = 100;

export const SUCCESSFUL_GRADE = 60;

export const MESSAGE_TYPE = {
  FAILED: "FAILED",
  FAILED_WITH_IMPROVEMENT: "FAILED_WITH_IMPROVEMENT",
  SUCCESSFUL: "SUCCESSFUL",
  SUCCESSFUL_WITH_IMPROVEMENT: "SUCCESSFUL_WITH_IMPROVEMENT",
};

export const MESSAGE_TYPE_TEXT = {
  [MESSAGE_TYPE.FAILED]: MIN_GRADE_WARNING_TEXT,
  [MESSAGE_TYPE.FAILED_WITH_IMPROVEMENT]: `${MIN_GRADE_WARNING_TEXT} ${ACTION_TO_IMPROVE_TEXT}`,
  [MESSAGE_TYPE.SUCCESSFUL_WITH_IMPROVEMENT]:
    SUCCESSFUL_GRADE_TEXT_WITH_IMPROVEMENT,
  [MESSAGE_TYPE.SUCCESSFUL]: SUCCESSFUL_GRADE_TEXT,
};

export const OLD_MAX_GRADE = 5;
export const correctGrade = [0, 0, 0, 0.5, 0.5, 0.5, 0.5, 1, 1, 1];
