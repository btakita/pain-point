<map version="0.7.1">
<node TEXT="Developer Testing Tricks">
<edge WIDTH="thin"/>
<font NAME="SansSerif" SIZE="12"/>
<node TEXT="Introduction 2:30" POSITION="right">
<node TEXT="Who uses rspec?"/>
<node TEXT="Who uses the Story Runner?"/>
<node TEXT="Who uses Test::Unit?"/>
<node TEXT="Who uses test/spec?"/>
<node TEXT="Who uses Shoulda?"/>
<node TEXT="Most of my examples will be in Rspec"/>
</node>
<node TEXT="Focus of Tests 5:00" POSITION="right">
<node TEXT="Method">
<node TEXT="Automated">
<node TEXT="xunit"/>
<node TEXT="rspec"/>
<node TEXT="fit"/>
<node TEXT="custom test scripts"/>
</node>
<node TEXT="Manual">
<node TEXT="Traditional QA"/>
<node TEXT="Exploratory Testing"/>
</node>
</node>
<node TEXT="Audience">
<node TEXT="Developer">
<node TEXT="Rspec"/>
<node TEXT="Test::Unit"/>
</node>
<node TEXT="Customer (Customer Acceptance)">
<node TEXT="Story Runner"/>
<node TEXT="Fit"/>
</node>
</node>
<node TEXT="Scope">
<node TEXT="Unit"/>
<node TEXT="Functional"/>
<node TEXT="Integration"/>
</node>
</node>
<node TEXT="Granularity of Tests" POSITION="right">
<node TEXT="Happy Path testing"/>
<node TEXT="Edge case testing"/>
</node>
<node TEXT="Installing rspec 3:00" POSITION="right"/>
<node TEXT="Vote Example 10:00" POSITION="right">
<node TEXT="Explain the structure of a test">
<node TEXT="physical structure">
<node TEXT="before"/>
<node TEXT="execution"/>
<node TEXT="after"/>
</node>
<node TEXT="logical structure">
<node TEXT="preconditions"/>
<node TEXT="implementation"/>
<node TEXT="postconditions"/>
</node>
</node>
<node TEXT="State Machine">
<node TEXT="Introduce Acts as State Machine"/>
<node TEXT="Test the Scenarios using nested describes"/>
<node TEXT="Refactor to Fitnesse"/>
</node>
<node TEXT="Associations">
<node TEXT=".up"/>
<node TEXT=".down"/>
</node>
<node TEXT="Fixture specs"/>
</node>
<node TEXT="Lifecycle of a Test" POSITION="right">
<node TEXT="TDD">
<node TEXT="Red -&gt; Green -&gt; Refactor">
<node TEXT="Write the tests first, then implement the software"/>
<node TEXT="These tests drive design"/>
<node TEXT="Its easy to make a test that does not test anything">
<node TEXT="For example, testing the elements within an empty collection"/>
<node TEXT="Use Preconditions to set the context of your test"/>
</node>
</node>
<node TEXT="Tests to drive the design of the software"/>
<node TEXT="Tests should be refactored"/>
<node TEXT="You can manually test drive your code, its just slower and you dont get to keep the tests"/>
<node TEXT="TDD Goals">
<node TEXT="Specification, not validation"/>
<node TEXT="Feedback">
<node TEXT="Developer makes smaller steps"/>
<node TEXT="Developer knows when the code is finished"/>
</node>
<node TEXT="Developer has an example of using the implementation code"/>
<node TEXT="Developer maintains focus on the objective"/>
<node TEXT="Fast Iterations"/>
<node TEXT="Developer rhythm"/>
<node TEXT="Confidence"/>
<node TEXT="Simplicity"/>
<node TEXT="YAGNI"/>
<node TEXT="Make a regression test"/>
</node>
</node>
<node TEXT="Regression">
<node TEXT="Tests to ensure that your software still works when you make changes"/>
<node TEXT="Tests live longer than the code (the implementation often changes)"/>
<node TEXT="Regression Test Goals">
<node TEXT="Verify your software does not break due to changes in implementation or state"/>
<node TEXT="Courage">
<node TEXT="Support Experimentation &amp; Refactoring"/>
</node>
<node TEXT="Documentation">
<node TEXT="Tests should clearly document your system">
<node TEXT="Refactor the test if it is not clear or focused"/>
<node TEXT="Nested ExampleGroups are very helpful in showing contextual logic"/>
</node>
<node TEXT="Unit tests should match the logical layout of your software"/>
</node>
<node TEXT="Clarity"/>
<node TEXT="Fail in the right places">
<node TEXT="Avoid crying wolf due to unnecessary brittleness"/>
<node TEXT="Keep tests predictable"/>
</node>
</node>
</node>
<node TEXT="Retirement">
<node TEXT="Tests that are no longer useful">
<font NAME="SansSerif" SIZE="12"/>
</node>
</node>
</node>
<node TEXT="Restful Authentication Example 10:00" POSITION="right">
<node TEXT="Install the Restful Authentication plugin"/>
<node TEXT="Generate the files and tests"/>
<node TEXT="Refactor the tests">
<node TEXT="Nested describes">
<node TEXT="Describe ExampleGroup Subclassing"/>
<node TEXT="Scope">
<node TEXT="Class"/>
<node TEXT="Method"/>
<node TEXT="Context"/>
</node>
</node>
</node>
</node>
<node TEXT="VoteSubmissionsController Examples 10:00" POSITION="right">
<node TEXT="UpVoteSubmissionsController"/>
<node TEXT="DownVoteSubmissionsController"/>
<node TEXT="ExampleGroup methods that create Examples">
<node TEXT=".should_require_login"/>
<node TEXT="advantages"/>
<node TEXT="disadvantages"/>
</node>
<node TEXT="Talk about duplication in the specs">
<node TEXT="DRY"/>
<node TEXT="Clarity (Straightforwardness)"/>
</node>
<node COLOR="#990000" TEXT="Refactor using Shared Describes"/>
</node>
<node TEXT="View Specs Example 10:00" POSITION="right">
<node TEXT="erb view spec"/>
<node TEXT="Introduce Erector"/>
<node TEXT="Erector view spec"/>
</node>
<node TEXT="Custom Matcher" POSITION="right">
<node TEXT="have_link.rb in rspec_hpricot_matchers plugin"/>
<node TEXT="using fork on github to introduce features to existing projects"/>
</node>
<node TEXT="Audience participation 30:00" POSITION="right">
<node TEXT="Introduce Git"/>
<node TEXT="Instruct audience to jump to a certain branch"/>
</node>
<node TEXT="Extracting up and down links into JS example 20:00" POSITION="right">
<node TEXT="Client/Server architecture">
<node TEXT="Advantages"/>
<node TEXT="Disadvantages"/>
<node TEXT="Why its more testable"/>
</node>
<node TEXT="screw unit + server"/>
</node>
<node TEXT="Selenium Testing 10:00" POSITION="right"/>
<node TEXT="Test Double Example" POSITION="right">
<node TEXT="Introduce RR"/>
<node TEXT="Mocks"/>
<node TEXT="Stubs"/>
<node TEXT="Mock Proxy"/>
<node TEXT="Stub Proxy"/>
</node>
<node TEXT="Audience participation 30:00" POSITION="right"/>
<node TEXT="send instructions to participants" POSITION="left">
<node TEXT="notify that this is a preliminary outline, it will change the following week"/>
<node TEXT="git clone pain-point"/>
<node TEXT="sudo geminstaller"/>
</node>
<node TEXT="Information Radiators (Use posters with sticky backs)" POSITION="left">
<node TEXT="Red, Green, Refactor"/>
<node TEXT="Nested Describes (Class, Method, Context)"/>
<node TEXT="Scope - Functional, Unit, Integration"/>
<node TEXT="Audience - Developer, Customer"/>
</node>
</node>
</map>
