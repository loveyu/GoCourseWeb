<?php

class TbQuizOptions
{
    public $optionId = 100;
    public $quizId = 1000;
    public $description = "xxxx";
    public $feedback = "xxxx";
    public $isCorrect = false;
    public $numResponses = 5;
    public $percentage = 45.5;
    public $selected = true;
}

class TbQuizes
{
    public $quizId = 1000;
    public $scheduleId = 1000;
    public $status = 1;
    public $releaseDate = "2015-4-4 12:44:33";
    public $title = "";
    public $numResponses = 4554;
    public $options = [];

    function __construct()
    {
        $this->options = [new TbQuizOptions(), new TbQuizOptions(), new TbQuizOptions(), new TbQuizOptions(), new TbQuizOptions()];
    }
}

